import React from 'react';
import ByTime from "../components/book/ByTime";

// const HorizontalList = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-evenly;
//   align-items: center;
// `

export default function BookingPage() {
    // const [choice, setChoice] = useState<"time" | "test">("time");

    return (
        <div>
            {/*<HorizontalList>*/}

            {/*    <HashLink to="#time">*/}
            {/*        <Button type="primary" onClick={() => {*/}
            {/*            setChoice("time");*/}
            {/*            tg.expand();*/}
            {/*        }}>By Start Time</Button>*/}
            {/*    </HashLink>*/}

            {/*    {isDebug && <HashLink to='#test'>*/}
            {/*        <Button type="primary" onClick={() => {*/}
            {/*            setChoice("test");*/}
            {/*            tg.expand();*/}
            {/*        }}>Test</Button>*/}
            {/*    </HashLink>}*/}

            {/*</HorizontalList>*/}

            {/*{choice === "time" && <ByTime/>}*/}

            {/*{choice === "test" && isDebug && <Test/>}*/}
            <ByTime/>
        </div>
    )
}