// bertugas membuat mailto‐link
export default class ContactModel {
  constructor(serviceEmail) {
    this.serviceEmail = serviceEmail;
  }

  buildMailtoLink(name, message) {
    const subject = `Message from ${name} via JeraWHAT?! site`;
    const body =
      `Name: ${name}\n\n` +
      `Message:\n${message}`;
    return `mailto:${this.serviceEmail}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  }
}