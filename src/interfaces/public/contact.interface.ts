export interface ScheduleEntry {
  days: string;
  hours: string;
}

export interface ContactData {
  address: string;
  phone: string;
  schedule: ScheduleEntry[];
}
