module.exports = {

"[project]/actions/user.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"00596792a4f2b0f4e1ab9d9b50cf54365595624062":"getUserOnboardingStatus","40a97ba6d006fac248d4097c94dbebce0649015308":"updatedUser"},"",""] */ __turbopack_context__.s({
    "getUserOnboardingStatus": (()=>getUserOnboardingStatus),
    "updatedUser": (()=>updatedUser)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function updatedUser(data) {
    const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId) {
        throw new Error("User not authenticated");
    }
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].user.findUnique({
        where: {
            clerkUserId: userId
        }
    });
    if (!user) {
        throw new Error("User not found");
    }
    try {
        //Transaction means that in callback check everything is done check all the mention function or if not then show error
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].$transaction(async (tx)=>{
            //find if the industry exists
            let industryInsight = await tx.industryInsight.findUnique({
                where: {
                    industry: data.industry
                }
            });
            // If industry doesn't exits, create it with default values - will replace with ai
            if (!industryInsight) {
                industryInsight = await tx.industryInsight.create({
                    data: {
                        industry: data.industry,
                        salaryRanges: [],
                        growthRate: 0,
                        demandLevel: "Medium",
                        topSkills: [],
                        marketOutlook: "Neutral",
                        keyTrends: [],
                        recommendedSkills: [],
                        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    }
                });
            }
            //update the user
            const updatedUser = await tx.user.update({
                where: {
                    id: user.id
                },
                data: {
                    industry: data.industry,
                    experience: data.experience,
                    bio: data.bio,
                    skills: data.skills
                }
            });
            return {
                updatedUser,
                industryInsight
            };
        }, {
            timeout: 10000
        });
        return result.user;
    } catch (error) {
        console.error("Error updating user and industry:", error.message);
        throw new Error("Failed to update user");
    }
}
async function getUserOnboardingStatus() {
    const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId) {
        throw new Error("User not authenticated");
    }
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].user.findUnique({
        where: {
            clerkUserId: userId
        }
    });
    if (!user) {
        throw new Error("User not found");
    }
    try {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].user.findUnique({
            where: {
                clerkUserId: userId
            },
            select: {
                industry: true
            }
        });
        return {
            isOnboarded: !!user?.industry
        };
    } catch (error) {
        console.error("Error fetching user onboarding status:", error.message);
        throw new Error("Failed to fetch user onboarding status");
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    updatedUser,
    getUserOnboardingStatus
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatedUser, "40a97ba6d006fac248d4097c94dbebce0649015308", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserOnboardingStatus, "00596792a4f2b0f4e1ab9d9b50cf54365595624062", null);
}}),
"[project]/app/layout.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.js [app-rsc] (ecmascript)"));
}}),
"[project]/app/(main)/layout.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/(main)/layout.js [app-rsc] (ecmascript)"));
}}),
"[project]/data/industries.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "industries": (()=>industries)
});
const industries = [
    {
        id: "tech",
        name: "Technology",
        subIndustries: [
            "Software Development",
            "IT Services",
            "Cybersecurity",
            "Cloud Computing",
            "Artificial Intelligence/Machine Learning",
            "Data Science & Analytics",
            "Internet & Web Services",
            "Robotics",
            "Quantum Computing",
            "Blockchain & Cryptocurrency",
            "IoT (Internet of Things)",
            "Virtual/Augmented Reality",
            "Semiconductor & Electronics"
        ]
    },
    {
        id: "finance",
        name: "Financial Services",
        subIndustries: [
            "Banking",
            "Investment Banking",
            "Insurance",
            "FinTech",
            "Wealth Management",
            "Asset Management",
            "Real Estate Investment",
            "Private Equity",
            "Venture Capital",
            "Cryptocurrency & Digital Assets",
            "Risk Management",
            "Payment Processing",
            "Credit Services"
        ]
    },
    {
        id: "healthcare",
        name: "Healthcare & Life Sciences",
        subIndustries: [
            "Healthcare Services",
            "Biotechnology",
            "Pharmaceuticals",
            "Medical Devices",
            "Healthcare IT",
            "Telemedicine",
            "Mental Health Services",
            "Genomics",
            "Clinical Research",
            "Healthcare Analytics",
            "Elder Care Services",
            "Veterinary Services",
            "Alternative Medicine"
        ]
    },
    {
        id: "manufacturing",
        name: "Manufacturing & Industrial",
        subIndustries: [
            "Automotive",
            "Aerospace & Defense",
            "Electronics Manufacturing",
            "Industrial Manufacturing",
            "Chemical Manufacturing",
            "Consumer Goods",
            "Food & Beverage Processing",
            "Textile Manufacturing",
            "Metal Fabrication",
            "3D Printing/Additive Manufacturing",
            "Machinery & Equipment",
            "Packaging",
            "Plastics & Rubber"
        ]
    },
    {
        id: "retail",
        name: "Retail & E-commerce",
        subIndustries: [
            "E-commerce Platforms",
            "Retail Technology",
            "Fashion & Apparel",
            "Consumer Electronics",
            "Grocery & Food Retail",
            "Luxury Goods",
            "Sports & Recreation",
            "Home & Garden",
            "Beauty & Personal Care",
            "Pet Products",
            "Specialty Retail",
            "Direct-to-Consumer (D2C)",
            "Department Stores"
        ]
    },
    {
        id: "media",
        name: "Media & Entertainment",
        subIndustries: [
            "Digital Media",
            "Gaming & Esports",
            "Streaming Services",
            "Social Media",
            "Digital Marketing",
            "Film & Television",
            "Music & Audio",
            "Publishing",
            "Advertising",
            "Sports Entertainment",
            "News & Journalism",
            "Animation",
            "Event Management"
        ]
    },
    {
        id: "education",
        name: "Education & Training",
        subIndustries: [
            "EdTech",
            "Higher Education",
            "Professional Training",
            "Online Learning",
            "K-12 Education",
            "Corporate Training",
            "Language Learning",
            "Special Education",
            "Early Childhood Education",
            "Career Development",
            "Educational Publishing",
            "Educational Consulting",
            "Vocational Training"
        ]
    },
    {
        id: "energy",
        name: "Energy & Utilities",
        subIndustries: [
            "Renewable Energy",
            "Clean Technology",
            "Oil & Gas",
            "Nuclear Energy",
            "Energy Management",
            "Utilities",
            "Smart Grid Technology",
            "Energy Storage",
            "Carbon Management",
            "Waste Management",
            "Water & Wastewater",
            "Mining",
            "Environmental Services"
        ]
    },
    {
        id: "consulting",
        name: "Professional Services",
        subIndustries: [
            "Management Consulting",
            "IT Consulting",
            "Strategy Consulting",
            "Digital Transformation",
            "Business Advisory",
            "Legal Services",
            "Accounting & Tax",
            "Human Resources",
            "Marketing Services",
            "Architecture",
            "Engineering Services",
            "Research & Development",
            "Business Process Outsourcing (BPO)"
        ]
    },
    {
        id: "telecom",
        name: "Telecommunications",
        subIndustries: [
            "Wireless Communications",
            "Network Infrastructure",
            "Telecom Services",
            "5G Technology",
            "Internet Service Providers",
            "Satellite Communications",
            "Data Centers",
            "Fiber Optics",
            "Mobile Technology",
            "VoIP Services",
            "Network Security",
            "Telecom Equipment",
            "Cloud Communications"
        ]
    },
    {
        id: "transportation",
        name: "Transportation & Logistics",
        subIndustries: [
            "Electric Vehicles",
            "Autonomous Vehicles",
            "Logistics & Supply Chain",
            "Aviation",
            "Railways",
            "Maritime Transport",
            "Urban Mobility",
            "Fleet Management",
            "Last-Mile Delivery",
            "Warehousing",
            "Freight & Cargo",
            "Public Transportation",
            "Space Transportation"
        ]
    },
    {
        id: "agriculture",
        name: "Agriculture & Food",
        subIndustries: [
            "AgTech",
            "Farming",
            "Food Production",
            "Sustainable Agriculture",
            "Precision Agriculture",
            "Aquaculture",
            "Vertical Farming",
            "Agricultural Biotechnology",
            "Food Processing",
            "Organic Farming",
            "Plant-Based Foods",
            "Agricultural Equipment",
            "Indoor Farming"
        ]
    },
    {
        id: "construction",
        name: "Construction & Real Estate",
        subIndustries: [
            "Commercial Construction",
            "Residential Construction",
            "Real Estate Development",
            "Property Management",
            "Construction Technology",
            "Building Materials",
            "Infrastructure Development",
            "Smart Buildings",
            "Interior Design",
            "Facilities Management",
            "Real Estate Technology",
            "Sustainable Building",
            "Urban Planning"
        ]
    },
    {
        id: "hospitality",
        name: "Hospitality & Tourism",
        subIndustries: [
            "Hotels & Resorts",
            "Restaurants & Food Service",
            "Travel Technology",
            "Tourism",
            "Event Planning",
            "Vacation Rentals",
            "Cruise Lines",
            "Catering",
            "Theme Parks",
            "Travel Agencies",
            "Hospitality Management",
            "Online Travel Booking",
            "Cultural Tourism"
        ]
    },
    {
        id: "nonprofit",
        name: "Non-Profit & Social Services",
        subIndustries: [
            "Charitable Organizations",
            "Social Services",
            "Environmental Conservation",
            "Humanitarian Aid",
            "Education Non-Profits",
            "Healthcare Non-Profits",
            "Arts & Culture",
            "Community Development",
            "International Development",
            "Animal Welfare",
            "Youth Organizations",
            "Social Enterprise",
            "Advocacy Organizations"
        ]
    }
];
}}),
"[project]/app/(main)/onboarding/_components/onboarding-form.jsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
;
const OnboardingForm = ({ industries })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "OnboardingForm"
    }, void 0, false, {
        fileName: "[project]/app/(main)/onboarding/_components/onboarding-form.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = OnboardingForm;
}}),
"[project]/app/(main)/onboarding/page.jsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$industries$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/industries.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$onboarding$2f$_components$2f$onboarding$2d$form$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/onboarding/_components/onboarding-form.jsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/user.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
;
const OnboardingPage = async ()=>{
    //Get onboarding status using fetch data
    const { isOnboarded } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$user$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOnboardingStatus"])();
    if (isOnboarded) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/dashboard");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$onboarding$2f$_components$2f$onboarding$2d$form$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
            industries: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$industries$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["industries"]
        }, void 0, false, {
            fileName: "[project]/app/(main)/onboarding/page.jsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(main)/onboarding/page.jsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = OnboardingPage;
}}),
"[project]/app/(main)/onboarding/page.jsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/(main)/onboarding/page.jsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=_0ebf379e._.js.map