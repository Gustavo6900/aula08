import { useEffect, useState } from "react";
import  { Button } from '@mui/material';
import { jsPDF} from "jspdf";
import "jspdf-autotable"
import {Link } from 'react-router-dom'
import Alterar from "./Alterar";

export default function Home() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, [])
  const removerRodolfo = async (id) => {
    try{
      await fetch('http://localhost:3000/usuarios/'+id ,{
        method: 'DELETE',
      }   )
    }catch{
      alert('Erro ao remover')
    }

  }

  const exportarPDF = () => {
    const doc = new jsPDF()
    const table = usuarios.map(usuarios => [
      usuarios.nome,
      usuarios.email
    ])
    doc.text('LIsta de usuarios', 10, 10)
    doc.autoTable({
      head : [["nome", "email"]],
      body: table
    })
    doc.save("alunos.pdf")
  }

  return (
    <div>
      <table>
      <Button variant= "contained" onClick={() => exportarPDF()}>Gerar Pdf</Button>
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td>
            <button onClick={() => removerRodolfo(usuario.id)}>X</button>
            <Link to = {'/alterar/' + usuario.id}><button>Alterar</button></Link>
            </td>
        </tr>
      )}
    </table>
      </div>
  );
}