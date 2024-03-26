export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneNumberRegex = /^(?:\+|0)[0-9]{1,3}\s[0-9]{6,14}$/;
export const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
export const urlRegex =
  /^((https?|ftp|smtp):\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}([a-zA-Z]{2,})(\/?[^\s]*)?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
