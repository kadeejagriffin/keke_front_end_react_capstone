import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Home({ isLoggedIn, retreats }) {
    return (_jsxs("div", { children: [_jsx("h1", { children: isLoggedIn ? 'Namastay' : 'Welcome, please log in!' }), isLoggedIn && (_jsx("ul", { children: retreats.map(retreat => (_jsxs("li", { children: [_jsx("h2", { children: retreat.name }), _jsxs("p", { children: ["Location: ", retreat.location] }), _jsxs("p", { children: ["Date: ", retreat.date] }), _jsxs("p", { children: ["Description: ", retreat.description] }), _jsxs("p", { children: ["Duration: ", retreat.duration] }), _jsxs("p", { children: ["Cost: ", retreat.cost] })] }, retreat.id))) }))] }));
}
