import React, {useEffect, useState} from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import Dashboard from "./components/Dashboad.jsx";
import Headers from "./components/Headers.jsx";
import Images from "./components/Images.jsx";
import Links from "./components/Links.jsx";
import {
    HomeIcon,
    DocumentTextIcon,
    PhotoIcon,
    LinkIcon,
} from '@heroicons/react/24/outline'

import { getFromStorage, saveToStorage } from "./utils.js";

export default function App() {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (index) => {
        setActiveTab(index);
        saveToStorage("active_tab", index)
    };

    const [theme, setTheme] = useState("light");
    const [mainClass, setMainClass] = useState('light');
    const tabs = [
        { name: 'Dashboard', icon: <HomeIcon className="h-6 w-6"/>, component: <Dashboard /> },
        { name: 'Headers', icon: <DocumentTextIcon className="h-6 w-6"/>, component: <Headers /> },
        { name: 'Images', icon: <PhotoIcon className="h-6 w-6"/>, component: <Images /> },
        { name: 'Links', icon: <LinkIcon className="h-6 w-6"/>, component: <Links /> },
    ];
    useEffect(() => {
        if (theme.includes('dark')) {
            setMainClass(`${theme} text-foreground bg-background`);
        } else {
            setMainClass(theme);
        }
    }, [theme]);

    return (
        <main className={mainClass}>
            <div className="flex w-full flex-col p-2">
                <Tabs aria-label="Options" color="primary" variant="bordered" selectedKey={activeTab} onSelectionChange={handleTabChange}>
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            title={
                                <div className="flex items-center space-x-2">
                                    {tab.icon}
                                    <span className="pr-2">{tab.name}</span>
                                </div>
                            }
                        >
                            <Card>
                                <CardBody>
                                    {tab.component}
                                </CardBody>
                            </Card>
                        </Tab>
                    ))}
                </Tabs>
            </div>
        </main>
    );
}
