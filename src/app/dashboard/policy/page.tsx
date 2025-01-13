"use client";
import React, { useState, useEffect } from "react";
import {
  getPolicies,
  createPolicy,
  updatePolicy,
  deletePolicy,
} from "@/api/Policy";
import { Policy } from "@/Types/Policy";
const PolicyPage = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [newPolicy, setNewPolicy] = useState<Policy>({
    title: "",
    content: "",
    _id: "",
  });
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    const data = await getPolicies();
    setPolicies(data);
  };

  const handleCreate = async () => {
    await createPolicy(newPolicy);
    setNewPolicy({ title: "", content: "" });
    fetchPolicies();
  };

  const handleUpdate = async (id: string) => {
    if (editingPolicy) {
      await updatePolicy(id, editingPolicy);
      setEditingPolicy(null);
      fetchPolicies();
    }
  };

  const handleDelete = async (id: string) => {
    await deletePolicy(id);
    fetchPolicies();
  };

  return (
    <div className="flex flex-col  p-4 mr-24 bg-red-50 " dir="rtl">
      <h1 className="text-2xl font-bold mb-4">السياسات</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="العنوان"
          value={newPolicy.title}
          onChange={(e) =>
            setNewPolicy({ ...newPolicy, title: e.target.value })
          }
          className="border rounded-lg p-2 mb-2 w-full text-right"
        />
        <textarea
          placeholder="المحتوى"
          value={newPolicy.content}
          onChange={(e) =>
            setNewPolicy({ ...newPolicy, content: e.target.value })
          }
          className="border rounded-lg p-2 mb-2 w-full text-right"
        />
        <button
          onClick={handleCreate}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg w-full">
          إنشاء
        </button>
      </div>
      <div>
        {policies
          .slice()
          .reverse()
          .map((policy) => (
            <div key={policy._id} className="mb-4">
              {editingPolicy && editingPolicy._id === policy._id ? (
                <>
                  <input
                    type="text"
                    value={editingPolicy.title}
                    onChange={(e) =>
                      setEditingPolicy({
                        ...editingPolicy,
                        title: e.target.value,
                      })
                    }
                    className="border rounded-lg p-2 mb-2 w-full text-right"
                  />
                  <textarea
                    value={editingPolicy.content}
                    onChange={(e) =>
                      setEditingPolicy({
                        ...editingPolicy,
                        content: e.target.value,
                      })
                    }
                    className="border rounded-lg p-2 mb-2 w-full text-right"
                  />
                  <button
                    onClick={() => policy._id && handleUpdate(policy._id)}
                    className="bg-teal-500 text-white px-4 py-2 rounded-lg w-full mb-2">
                    تحديث
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold">{policy.title}</h2>
                  <p>{policy.content}</p>
                  <button
                    onClick={() => setEditingPolicy(policy)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-2">
                    تعديل
                  </button>
                  <button
                    onClick={() => policy._id && handleDelete(policy._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg w-full">
                    حذف
                  </button>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PolicyPage;
