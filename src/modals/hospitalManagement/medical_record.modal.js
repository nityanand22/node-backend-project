import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({}, { timestamps: true });

export default mongoose.model("MedicalRecord", medicalRecordSchema);
