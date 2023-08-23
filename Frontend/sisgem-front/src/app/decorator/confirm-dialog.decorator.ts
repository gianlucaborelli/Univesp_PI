import { ConfirmDialogData } from "../service/confirm-dialog-data";
import { ConfirmDialogComponent } from "../components/shared/confirm-dialog/confirm-dialog.component";
import { DialogService } from "../service/dialog.service";

const defaultConfirmData = {
    title: "Confirmação",
    message: "Você em certeza que deseja proceguir com a ação?"
}

export function needConfirmation(confirmData: ConfirmDialogData = defaultConfirmData) {

    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any) {
            DialogService.getInstance()?.openDialog(confirmData, ConfirmDialogComponent).subscribe((validation) => {
                if (validation) {
                    originalMethod.apply(this, args);
                }
            });
        };
        return descriptor;
    };
}