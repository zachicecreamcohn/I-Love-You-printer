import mongoose, {Schema, Document} from 'mongoose';

interface LoveNoteInterface extends Document {
    note: string;
    timestamp: Date;
    sent: boolean;
}

const LoveNoteSchema: Schema = new Schema<LoveNoteInterface>({
    note: { type: String, required: true },
    timestamp: { type: Date, required: true },
    sent: { type: Boolean, default: false }
});

const LoveNote = mongoose.model<LoveNoteInterface>('LoveNote', LoveNoteSchema);

export default LoveNote;

