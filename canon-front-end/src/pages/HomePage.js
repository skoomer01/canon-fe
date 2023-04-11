import React from "react"
import TestSet from "../components/TestSet";

function HomePage(){
    return (
        <div>
            <h1>Here are your latest 9 test sets</h1>
            <TestSet />
        </div>
    );
}
export default HomePage;