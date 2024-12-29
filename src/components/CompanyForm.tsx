import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Company } from '../types';
import { X } from 'lucide-react';

interface CompanyFormProps {
  onClose: () => void;
  initialData?: Company;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({
  onClose,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<Company>>(
    initialData || {
      name: '',
      location: '',
      linkedinProfile: '',
      emails: [''],
      phoneNumbers: [''],
      comments: '',
      communicationPeriodicity: 14,
    }
  );

  const { addCompany, updateCompany } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const company = {
      ...formData,
      id: initialData?.id || crypto.randomUUID(),
    } as Company;

    if (initialData) {
      updateCompany(company);
    } else {
      addCompany(company);
    }
    onClose();
  };

  const handleArrayInput = (
    field: 'emails' | 'phoneNumbers',
    index: number,
    value: string
  ) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'emails' | 'phoneNumbers') => {
    setFormData({
      ...formData,
      [field]: [...(formData[field] || []), ''],
    });
  };

  const removeArrayItem = (field: 'emails' | 'phoneNumbers', index: number) => {
    const newArray = [...(formData[field] || [])];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {initialData ? 'Edit Company' : 'Add Company'}
          </h2>
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
              Company Name
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn Profile
            </label>
            <input
              type="url"
              value={formData.linkedinProfile || ''}
              onChange={(e) =>
                setFormData({ ...formData, linkedinProfile: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Emails
            </label>
            {formData.emails?.map((email, index) => (
              <div key={index} className="flex mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e: { target: { value: string; }; }) =>
                    handleArrayInput('emails', index, e.target.value)
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('emails', index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('emails')}
              className="mt-2 text-sm text-blue-500 hover:text-blue-700"
            >
              Add Email
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Numbers
            </label>
            {formData.phoneNumbers?.map((phone, index) => (
              <div key={index} className="flex mt-1">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e: { target: { value: string; }; }) =>
                    handleArrayInput('phoneNumbers', index, e.target.value)
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('phoneNumbers', index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('phoneNumbers')}
              className="mt-2 text-sm text-blue-500 hover:text-blue-700"
            >
              Add Phone Number
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Communication Periodicity (days)
            </label>
            <input
              type="number"
              value={formData.communicationPeriodicity || 14}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  communicationPeriodicity: parseInt(e.target.value),
                })
              }
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <textarea
              value={formData.comments || ''}
              onChange={(e: { target: { value: any; }; }) =>
                setFormData({ ...formData, comments: e.target.value })
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
              {initialData ? 'Update' : 'Add'} Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};