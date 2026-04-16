import Swal from "sweetalert2";

export const matCustomClass = {
    popup: 'mat-swal-popup',
    title: 'mat-swal-title',
    actions: 'mat-swal-actions',
    confirmButton: 'mat-swal-confirm',
    cancelButton: 'mat-swal-cancel'
}

export class Alert {

    static success(text: string) {
        Swal.fire({
            title: 'succes',
            text,
            icon: 'success',
            customClass: matCustomClass
        })
    }

    static loginEror(text: string) {
        Swal.fire({

            title: 'error',
            text,
            icon: 'error',
            customClass: matCustomClass
        })
    }

       static async confirm(text: string, callback: Function) {
        const result = await Swal.fire({
            title: "Are you sure?",
            text,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            customClass: matCustomClass
        })

        if (result.isConfirmed) {
            await callback()
        }
     }
}

