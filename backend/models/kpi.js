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
}, {
    timestamps: true, 
    toJSON: {
        transform: (doc, ret) => {
            ret.target_value = parseFloat(ret.target_value.toString());
            ret.actual_value = parseFloat(ret.actual_value.toString());
            return ret;
        }
    }
});

export const Kpi = mongoose.models.Kpi || mongoose.model("Kpi", KpiSchema);