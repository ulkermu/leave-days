import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IconButton, Divider } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  const links = [
    { name: "twitter", location: "https://twitter.com/anonimum93" },
    { name: "github", location: "https://github.com/ulkermu" },
    { name: "linkedin", location: "https://www.linkedin.com/in/muratulker93/" },
  ];

  return (
    <>
      <Divider
        className="max-w-[1280px] w-full mx-5"
        style={{ background: "var(--text)" }}
      />
      <footer className="flex max-w-[1280px] w-full justify-around p-5 max-[640px]:flex-col max-[640px]:gap-5">
        <div className="max-w-md flex flex-col gap-3 max-[640px]:max-w-full">
          <h4 className="text-lg font-bold">About LeaveDays</h4>
          <p>
            Creating a system where we can input the leave days used within the
            company and add or remove employees.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h4 className="font-bold">Get Connected</h4>
          <div>
            {links.map((link, key) => (
              <Link key={key} href={link.location} target="_blank">
                <IconButton className="dark:hover:bg-slate-500 rounded-full ease-out duration-150">
                  {link.name === "twitter" && (
                    <TwitterIcon sx={{ color: "var(--text)" }} />
                  )}
                  {link.name === "github" && (
                    <GitHubIcon sx={{ color: "var(--text)" }} />
                  )}
                  {link.name === "linkedin" && (
                    <LinkedInIcon sx={{ color: "var(--text)" }} />
                  )}
                </IconButton>
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
