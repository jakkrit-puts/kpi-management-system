import mongoose from "mongoose";

const KpiUpdateSchema = new mongoose.Schema({
    kpi_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kpi',
        required: true
    },
    updated_value: {
        type: mongoose.Decimal128,
        required: true
    },
    comment: {
        type: String,
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

export const KpiUpdate = mongoose.model("KpiUpdate", KpiUpdateSchema);
