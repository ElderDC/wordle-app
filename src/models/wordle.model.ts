export enum IWordleLetterStatus {
	correct = 'correct',
	present = 'present',
	absent = 'absent',
}

export interface IWordleLetter {
	letter: string
	value?: string
	status: IWordleLetterStatus
}

export const statusColorOptions: Record<IWordleLetterStatus, string> = {
	[IWordleLetterStatus.correct]: 'bg-success',
	[IWordleLetterStatus.present]: 'bg-warning',
	[IWordleLetterStatus.absent]: 'bg-muted',
}
