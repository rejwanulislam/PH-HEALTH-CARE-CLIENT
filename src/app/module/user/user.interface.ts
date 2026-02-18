import { Gender } from "../../../generated/prisma/enums";

export interface IcreateDoctorPayload{
    password: string;
doctor:{
    name: string;
    email: string;  
    profilepic?: string;
    contactNumber?: string;
    address?: string;
    registrationNumber: string;
    experienceYears?: number;
    gender: Gender;
    appointmentFee: number;
    qualifications: string;
    currentWorkingPlace: string;
    degination: string;
    averageRating: number;
}
doctorSpecialties: string[];
}