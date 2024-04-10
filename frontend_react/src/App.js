//App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes
import { Navigation, Footer } from "./Template";
import Login_Page from "./Login_Page";
import Uniform_Split from "./Uniform_Split";
import User_Page from "./User_Page";
import Group_Page from "./Group_Page";
import Create_Acc from "./Create_Acc";
import Display_Group from "./Display_Group";
import Participants from "./Participants";
import NonUni_Split from "./NonUni_Split";
import Settle_Expense from "./Settle_Expense";
import Create_Group from "./Create_Group";
import Add_Participant from "./Add_Participant";
import Split_Page from "./Split_Page";
import Settle_Up from "./Settle_Up";
import "./App.css";

function App() {
  return (
    <Router>
      <Navigation />
      <Footer />
      <div>
        <Routes>
          <Route path="/" element={<Login_Page />} />
          <Route path="/Login_Page" element={<Login_Page />} />
          <Route path="/Create_Acc" element={<Create_Acc />} />
          <Route path="/User_Page" element={<User_Page />} />
          <Route path="/Group_Page" element={<Group_Page />} />
          <Route path="/Uniform_Split" element={<Uniform_Split />} />
          <Route path="/Display_Group" element={<Display_Group />} />
          <Route path="/Participants" element={<Participants />} />
          <Route path="/NonUni_Split" element={<NonUni_Split />} />
          <Route path="/Settle_Expense" element={<Settle_Expense />} />
          <Route path="/Create_Group" element={<Create_Group />} />
          <Route path="/Add_Participant" element={<Add_Participant />} />
          <Route path="/Split_Page" element={<Split_Page />} />
          <Route path="/Settle_Up" element={<Settle_Up />} />          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
