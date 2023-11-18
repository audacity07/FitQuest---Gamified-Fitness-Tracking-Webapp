import { useState } from "react";

function UserCard({ _id, email, username, createdAt, onDeleteUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Successful deletion, notify the parent component to update the user list
        onDeleteUser(id);
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset the input fields to their original values
    setNewUsername(username);
    setNewEmail(email);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/update/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: newUsername, email: newEmail }),
      });

      if (response.status === 200) {
        // Successful update, update the state with the new information
        setIsEditing(false); // Exit editing mode
        // Update the parent component or state with the new data
        // onUpdateUserData(_id, newUsername, newEmail);
        alert("User information updated successfully");
      } else {
        alert("Failed to update user information");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user information");
    }
  };
  return (
    <tr className="border-b border-gray-300">
      <td className="px-4 py-2">
        {isEditing ? (
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full rounded p-2 border focus:outline-none focus:ring focus:border-blue-300"
          />
        ) : (
          <span className="text-gray-800">{username}</span>
        )}
      </td>
      <td className="px-4 py-2">
        {isEditing ? (
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full rounded p-2 border focus:outline-none focus:ring focus:border-blue-300"
          />
        ) : (
          <span>{email}</span>
        )}
      </td>
      <td className="px-4 py-2 hidden md:table-cell">{createdAt}</td>
      <td className="px-4 py-2">
        {isEditing ? (
          <div className="flex space-x-2">
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white py-2 px-4 rounded-full"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white py-2 px-4 rounded-full"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white py-2 px-4 rounded-full"
          >
            Edit
          </button>
        )}
      </td>
      <td className="px-4 py-2">
        <button
          onClick={() => handleDelete(_id)}
          className="bg-red-500 text-white py-2 px-4 rounded-full"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default UserCard;
