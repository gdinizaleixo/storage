import * as React from "react";
import { supabase } from "../utils/supabase";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { toast } from "react-toastify";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    toast.success("Deslogado com Sucesso");
  }

  return (
    <div>
      <button
        id=""
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="text-black text-[16px] capitalize border-[1px] bg-white rounded-[30px] px-3 py-1 font-bold hover:bg-white"
      >
        Conta
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/user">Minha Conta</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/signUp">Criar uma Conta</Link>
        </MenuItem>
        <MenuItem onClick={signOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
}
