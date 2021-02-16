export interface MFACodeDto {
    code: string;
    key: string;
    uri: string;
    recoveryCodesLeft: number;
    isMachineRemembered: boolean;
}
