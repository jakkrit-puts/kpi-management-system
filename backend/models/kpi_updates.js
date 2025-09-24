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
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.updated_value = parseFloat(ret.updated_value.toString());
            return ret;
        }
    }
});

export const KpiUpdate = mongoose.models.KpiUpdate || mongoose.model("KpiUpdate", KpiUpdateSchema);
