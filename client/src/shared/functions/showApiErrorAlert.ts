import Swal from 'sweetalert2'

interface IShowApiAlertErrorArgs {
  message: string
  alertBackground: string
  alertColor: string
}

export const showApiErrorAlert = (args: IShowApiAlertErrorArgs) => {

  Swal.fire({
    titleText: 'Ocorreu um erro',
    text: args.message,
    icon: 'error',
    background: args.alertBackground,
    color: args.alertColor
  })
}