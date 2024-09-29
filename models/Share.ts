import mongoose, { Schema, Document } from 'mongoose';

interface Share extends Document {
  ticker: string;
  lastKnownValue: number;
  units: number;
}

const ShareSchema: Schema = new Schema({
  ticker: { type: String, required: true },
  name: { type: String, required: true },
  lastKnownValue: { type: Number, default: 0 },
  units: { type: Number, required: true },
  targetAllocation: { type: Number, required: true },
}, { collection: 'Shares'});

const Share = mongoose.model<Share>('Share', ShareSchema);

export default Share;
