import { Request, Response } from "express";
import { Op } from "sequelize";
import { Contact } from "../models/Contact";

export async function identify(req: Request, res: Response) {
  try {
    const { email, phoneNumber } = req.body;

    // Step 1 : Find 3 record => record with Email, record with phoneNo, record with either email or phoneNo
    const [existingEmail, existingPhone, existingContact] = await Promise.all([
      Contact.findOne({
        where: { email, linkPrecedence: "primary" },
      }),

      Contact.findOne({
        where: { phoneNumber, linkPrecedence: "primary" },
      }),

      Contact.findOne({
        where: {
          [Op.or]: [{ email }, { phoneNumber }],
        },
      }),
    ]);

    // Step 2 : If record doesn't exist then create one and respond
    if (!existingContact) {
      const record: any = {
        email,
        phoneNumber,
        linkPrecedence: "primary",
      };
      const newContact = await Contact.create(record);

      return res.status(200).json({
        contact: {
          primaryContatctId: newContact.id,
          emails: [newContact.email],
          phoneNumbers: [newContact.phoneNumber],
          secondaryContactIds: [],
        },
      });
    }

    let primaryContact: any = existingContact;

    // Step 3 : If both email and phoneNo exist in different primary record then update latest record with secondary precedence
    if (
      existingEmail &&
      existingPhone &&
      existingEmail.id !== existingPhone.id
    ) {
      let newLinkedId;
      let latestPrimary;
      if (existingEmail.createdAt > existingPhone.createdAt) {
        latestPrimary = existingEmail;
        newLinkedId = existingPhone.id;
      } else {
        latestPrimary = existingPhone;
        newLinkedId = existingEmail.id;
      }

      await Contact.update(
        {
          linkedId: newLinkedId,
          linkPrecedence: "secondary",
          updatedAt: new Date(),
        },
        { where: { id: latestPrimary.id } }
      );
    }

    // Step 4 : If record's linkPrecedence is secondary then find primary contact
    if (existingContact.linkPrecedence === "secondary") {
      primaryContact = await Contact.findByPk(existingContact.linkedId);
    }

    // Step 5 : Find all Secondary records
    const secondaryContacts = await Contact.findAll({
      where: {
        linkedId: primaryContact.id,
      },
    });

    const phoneNoSet = new Set([
      primaryContact.phoneNumber,
      ...secondaryContacts.map((contact) => contact.phoneNumber),
    ]);

    const emailSet = new Set([
      primaryContact.email,
      ...secondaryContacts.map((contact) => contact.email),
    ]);

    const secondaryIDSet = new Set(
      secondaryContacts.map((contact) => contact.id)
    );

    // Step 6 : If any of the information is new then create new record with secondary link Precedence
    const isNewEmail =
      email &&
      primaryContact.email !== email &&
      !Array.from(emailSet).includes(email);

    const isNewPhoneNumber =
      phoneNumber &&
      primaryContact.phoneNumber !== phoneNumber &&
      !Array.from(phoneNoSet).includes(phoneNumber);

    if (isNewEmail || isNewPhoneNumber) {
      // Create a new secondary contact with the common email/phone and the new information
      const record: any = {
        email,
        phoneNumber,
        linkedId: primaryContact.id,
        linkPrecedence: "secondary",
      };
      const newContact = await Contact.create(record);
      emailSet.add(newContact.email);
      phoneNoSet.add(newContact.phoneNumber);
      secondaryIDSet.add(newContact.id);
    }

    const responsePayload = {
      contact: {
        primaryContatctId: primaryContact.id,
        emails: Array.from(emailSet),
        phoneNumbers: Array.from(phoneNoSet),
        secondaryContactIds: Array.from(secondaryIDSet),
      },
    };
    return res.status(200).json(responsePayload);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
