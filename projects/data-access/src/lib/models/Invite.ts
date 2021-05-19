export class Invite {
    public id: string;
    public email: string;
    public senderId: string;
    public senderUserId: string;
    public senderName: string;
    public teamId: string;
    public teamName: string;
    public acceptedUserName: string;
    public acceptedEmail: string;
    public acceptedUserId: string;
    public acceptedMemberId: string;
    public acceptedDate: Date | null;
    public createdDate: Date;
    public expiryDate: Date | null;
}
