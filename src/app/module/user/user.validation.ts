import * as z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorZodSchema = z.object({
  password: z.string("Password is required").min(8, "Password must be at least 8 characters long").max(100, "Password must be less than 100 characters long"),
  doctor: z.object({
    name: z.string("Name is required").min(5, "Name must be at least 5 characters long").max(100, "Name must be less than 100 characters long"),
    email: z.string("Please provide a valid email address"),
    contactNumber: z.string("Contact number is required").min(11, "Contact number must be at least 11 digits long").max(15, "Contact number must be less than 15 digits long"),
    address: z.string("Address is required").min(10, "Address must be at least 10 characters long").max(200, "Address must be less than 200 characters long").optional(),
    registrationNumber: z.string("Registration number is required"),
    experienceYears: z.int("Experience years must be an integer").nonnegative("Experience years cannot be negative"),
    gender: z.enum([Gender.MALE, Gender.FEMALE], "Gender must be either MALE or FEMALE"),
    appointmentFee: z.number("Appointment fee must be a number").nonnegative("Appointment fee cannot be negative"),
    qualifications: z.string("Qualifications are required").min(2, "Qualifications must be at least 10 characters long").max(200, "Qualifications must be less than 200 characters long"),
    degination: z.string("Designation is required").min(2, "Designation must be at least 10 characters long").max(100, "Designation must be less than 100 characters long"),
    currentWorkingPlace: z.string("Current working place is required").min(2, "Current working place must be at least 10 characters long").max(100, "Current working place must be less than 100 characters long"),
  }),
  doctorSpecialties: z.array(z.uuid(), "Doctor specialties must be an array of UUIDs").min(1, "At least one doctor specialty is required")
})