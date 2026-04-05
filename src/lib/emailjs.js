import emailjs from "emailjs-com";

emailjs.init("YOUR_PUBLIC_KEY");

export const sendConfirmationEmail = async (participantData) => {
  const templateParams = {
    to_name: participantData.name,
    to_email: participantData.email,
    team_name: participantData.teamName,
    track: participantData.track,
    reg_id: participantData.regId,
  };

  return emailjs.send(
    "YOUR_SERVICE_ID",
    "YOUR_TEMPLATE_ID",
    templateParams
  );
};
