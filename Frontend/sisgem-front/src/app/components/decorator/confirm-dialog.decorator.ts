import { ConfirmDialogData } from "./confirm-dialog/confirm-dialog-data";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { DialogService } from "./confirm-dialog/dialog.service";

const defaultConfirmData = {
    title: "Confirmação",
    message: "Você em certeza que deseja prosseguir com a ação?"
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