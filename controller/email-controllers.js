import Email from "../model/email.js";
export const saveSentEmails = async (request, response) => {
  try {
    const email = new Email(request.body);
    await email.save();

    response.status(200).json("email saved successfully");
  } catch (error) {
    response.status(500).json(error.message);
  }
};
export const getEmails = async (request, response) => {
  try {
    let emails;
    if (request.params.type === "bin") {
      emails = await Email.find({ bin: true });
    } else if (request.params.type === "allmail") {
      emails = await Email.find();
    } else if (request.params.type === "starred") {
      emails = await Email.find({ starred: true, bin: false });
    } else {
      emails = await Email.find({ type: request.params.type });
    }
    return response.status(200).json(emails);
  } catch (error) {
    console.log(error.message);

    response.status(500).json(error.message);
  }
};
export const moveEmailsToBin = async (request, response) => {
  try {
    await Email.updateMany(
      { _id: { $in: request.body } },
      { $set: { bin: true, starred: false, type: "" } }
    );
    response.status(200).json("Emails moved to bin successfully");
  } catch (error) {
    console.log(error.message);
    response.status(500).json(error.message);
  }
};
export const toggleStarredEmails = async (request, response) => {
  try {
    await Email.updateOne(
      { _id: request.body.id },
      { $set: { starred: request.body.value } } // Corrected `starrted` to `starred`
    );

    return response.status(200).json("Email star status updated successfully");
  } catch (error) {
    console.log(error.message);
    response.status(500).json(error.message);
  }
};

export const deleteEmail = async (request, response) => {
  try {
    await Email.deleteMany({
      _id: {
        $in: request.body,
      },
    });
    return response.status(200).json('Emails Deleted Permanently');
  } catch (error) {
    console.log(error.message);
    response.status(500).json(error.message);
  }
};

