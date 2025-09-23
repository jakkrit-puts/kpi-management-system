import mongoose from "mongoose";

const KpiSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    target_value: {
        type: mongoose.Decimal128,
        required: true,
    },
    actual_value: {
        type: mongoose.Decimal128,
        default: 0,
    },
    status: {
        type: String,
        enum: ['On Track', 'At Risk', 'Off Track'],
    },
    assigned_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    }
}, { timestamps: true });

export const Kpi = mongoose.model("Kpi", KpiSchema);

