import React from 'react';
import { format } from 'date-fns';
import { useStore } from '../store/useStore';
import { Building2, Calendar, Phone, Mail } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { companies, communications, communicationMethods } = useStore();

  const getLastFiveCommunications = (companyId: string) => {
    return communications
      .filter((c: { companyId: string; }) => c.companyId === companyId)
      .sort((a: { date: { getTime: () => number; }; }, b: { date: { getTime: () => number; }; }) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);
  };

  const getNextScheduledCommunication = (companyId: string) => {
    const lastCommunication = communications
      .filter((c: { companyId: string; }) => c.companyId === companyId)
      .sort((a: { date: { getTime: () => number; }; }, b: { date: { getTime: () => number; }; }) => b.date.getTime() - a.date.getTime())[0];

    if (!lastCommunication) return null;

    const company = companies.find((c) => c.id === companyId);
    if (!company) return null;

    const nextDate = new Date(lastCommunication.date);
    nextDate.setDate(nextDate.getDate() + company.communicationPeriodicity);

    return {
      date: nextDate,
      methodId: communicationMethods[0].id,
    };
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Communication Dashboard</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Five Communications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Scheduled
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map((company) => {
                const lastFive = getLastFiveCommunications(company.id);
                const nextScheduled = getNextScheduledCommunication(company.id);
                const isOverdue = nextScheduled && nextScheduled.date < new Date();
                const isDueToday =
                  nextScheduled?.date &&
                  format(nextScheduled.date, 'yyyy-MM-dd') ===
                    format(new Date(), 'yyyy-MM-dd');

                return (
                  <tr
                    key={company.id}
                    className={`${
                      isOverdue
                        ? 'bg-red-50'
                        : isDueToday
                        ? 'bg-yellow-50'
                        : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {company.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {company.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {lastFive.map((comm) => {
                          const method = communicationMethods.find(
                            (m) => m.id === comm.methodId
                          );
                          return (
                            <div
                              key={comm.id}
                              className="flex items-center bg-gray-100 rounded px-2 py-1"
                              title={comm.notes}
                            >
                              {method?.name === 'Email' && (
                                <Mail className="h-4 w-4 mr-1" />
                              )}
                              {method?.name === 'Phone Call' && (
                                <Phone className="h-4 w-4 mr-1" />
                              )}
                              <span className="text-xs">
                                {format(comm.date, 'MM/dd')}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {nextScheduled && (
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm">
                            {format(nextScheduled.date, 'MMM dd, yyyy')}
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};