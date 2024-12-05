import { Routes as Switch, Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { ProgramView } from "../pages/ProgramView"
import { NotFound } from "../pages/NotFound"

export const AppRoutes = () => {
    return (
        <Switch>
            <Route path="/" element={<Home/>} />
            <Route path="/program" element={<ProgramView/>} />
            <Route path="/*" element={<NotFound/>} />
        </Switch>
    )
}