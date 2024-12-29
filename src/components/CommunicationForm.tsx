import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Communication } from '../types';
import { X } from 'lucide-react';

interface CommunicationFormProps {
  companyIds: string[];
  onClose: () => void;
}

export const CommunicationForm: React.FC<CommunicationFormProps> = ({
  companyIds,
  onClose,
}) => {
  const { communicationMethods, addCommunication } = useStore();
  const [formData, setFormData] = useState<Partial<Communication>>({
    methodId: communicationMethods[0].id,
    date: new Date(),
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    companyIds.forEach((companyId) => {
      const communication = {
        ...formData,
        id: crypto.randomUUID(),
        companyId,
        date: new Date(formData.date!),
      } as Communication;
      addCommunication(communication);
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Log Communication</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Communication Type
            </label>
            <select
              value={formData.methodId}
              onChange={(e) =>
                setFormData({ ...formData, methodId: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              {communicationMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="datetime-local"
              value={formData.date?.toISOString().slice(0, 16)}
              onChange={(e: { target: { value: string | number | Date; }; }) =>
                setFormData({ ...formData, date: new Date(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e: { target: { value: any; }; }) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Log Communication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};