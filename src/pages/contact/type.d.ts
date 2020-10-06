export type Contact = {
  id?: string;
  firstName: string;
  lastName: string;
  age: number | null | string;
  photo: string;
};

export type Mode = "add" | "edit" | null;

export type Contacts = Contact[];

export type ContactContainerProps = {
  contacts: Contacts;
  contact: Contact;
  mode: Mode;
  filter: string;
  setMode: (m: Mode) => void;
  handleSave: (data: Contact, mode: Mode, id?: string) => void;
  handleSelectContact: (c: Contact | null) => void;
  handleDeleteContact: (id: string) => void;
  setFilter: (text: string) => void;
};

export type ContactItemProps = {
  contact: Contact;
  isActive: boolean;
  handleSelectContact: (c: Contact | null) => void;
};

export type ContactHeaderFilterProps = Pick<
  ContactContainerProps,
  "filter" | "setFilter"
>;

export type ContactListProps = Pick<
  ContactContainerProps,
  | "contacts"
  | "handleSelectContact"
  | "contact"
  | "setMode"
  | "filter"
  | "setFilter"
>;

export type ContactDetailProps = Pick<
  ContactContainerProps,
  | "contact"
  | "handleSelectContact"
  | "mode"
  | "setMode"
  | "handleSave"
  | "handleDeleteContact"
>;
