import emailjs from "emailjs-com";

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const sendConfirmationEmail = async (participantData) => {
  const templateParams = {
    to_name: participantData.name,
    to_email: participantData.email,
    team_name: participantData.teamName,
    track: participantData.track,
    reg_id: participantData.regId,
  };

  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    templateParams
  );
};