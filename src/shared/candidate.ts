
export interface Candidate {
  candidate_id: number;
  account_name: string;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  city: string;
  state: string;
  phone_number: string;
  job_hunting: number;
  industry_id: number;
  subindustry_id: number;
  profession_id: number;
  subprofession_id: number;
  update_date: string;
  create_date: string;
}


/*
import { Comment } from './comment';

export interface Feedback {
  firstname: string;
  lastname: string;
  telnum: string;
  email: string;
  agree: boolean;
  contacttype: string;
  message: string;
  comments: Comment[];
}

export const ContactType = ['None', 'Tel', 'Email'];
*/
