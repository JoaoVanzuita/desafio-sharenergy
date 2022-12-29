import Swal from 'sweetalert2'

interface IShowAlertErrorArgs {
  message: string
  alertBackground: string
  alertColor: string
}

export const showErrorAlert = (args: IShowAlertErrorArgs) => {

  Swal.fire({
    titleText: 'Ocorreu um erro',
    text: args.message,
    icon: 'error',
    background: args.alertBackground,
    color: args.alertColor
  })

}