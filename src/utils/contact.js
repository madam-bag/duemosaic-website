import contactData from '../data/contact.json';

export const getContactInfo = () => {
  return contactData;
};

export const getEmail = () => {
  return contactData.email;
};

export const getPhones = () => {
  return contactData.phones;
};

export const getAddress = () => {
  return contactData.address;
};

export const getInstagram = () => {
  return contactData.instagram;
};

export const getCompanyName = () => {
  return contactData.companyName;
};

