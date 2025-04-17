import Mainapplayout from "../Components/layout/mainapplayout";

export default function Layout ({children} : {
    children : React.ReactNode;
}) {
    return <Mainapplayout>
        {children}
        </Mainapplayout>
}