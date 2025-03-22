import Head from "next/head";
import Footer from "./footer";
import Header from "./header";
import PropTypes from "prop-types";

const Layout = ({
                    title = "Juncture",
                    description = "This is Juncture website",
                    children,
                }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}/>
            </Head>
            <Header/>
            <main className="mt-[60px] bg-slate-100 max-w-screen">{children}</main>
            <Footer/>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
};

export default Layout;
