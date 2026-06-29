import React, { useState } from 'react';
import { DashboardLayout } from '../components/Layout';
import { UserProfile } from '../types';
import { CardMarkTab } from '../components/CardMarkTab';
import { motion, AnimatePresence } from 'motion/react';

export const CMDashboard: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState('cardmark');

  return (
    <DashboardLayout role="cm" activeTab={activeTab} setActiveTab={setActiveTab} profile={profile}>
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          {activeTab === 'cardmark' && <CardMarkTab />}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
};
