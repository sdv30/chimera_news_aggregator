import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PostingSchedule = ({ onScheduleChange = () => {}, initialSchedule = {} }) => {
  const [schedule, setSchedule] = useState({
    frequency: 'hourly',
    customInterval: 60,
    timezone: 'UTC+3',
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    },
    weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    maxPostsPerDay: 10,
    ...initialSchedule
  });

  const frequencyOptions = [
    { value: 'realtime', label: 'Real-time', description: 'Post immediately when articles are found' },
    { value: 'hourly', label: 'Every Hour', description: 'Batch posts every hour' },
    { value: 'daily', label: 'Daily Digest', description: 'One summary post per day' },
    { value: 'custom', label: 'Custom Interval', description: 'Set your own posting frequency' }
  ];

  const timezoneOptions = [
    { value: 'UTC+3', label: 'Moscow Time (UTC+3)' },
    { value: 'UTC+0', label: 'UTC (GMT+0)' },
    { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
    { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
    { value: 'UTC+1', label: 'Central European (UTC+1)' },
    { value: 'UTC+8', label: 'Beijing Time (UTC+8)' }
  ];

  const weekdayOptions = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const handleScheduleUpdate = (updates) => {
    const newSchedule = { ...schedule, ...updates };
    setSchedule(newSchedule);
    onScheduleChange(newSchedule);
  };

  const handleWeekdayToggle = (day) => {
    const newWeekdays = schedule?.weekdays?.includes(day)
      ? schedule?.weekdays?.filter(d => d !== day)
      : [...schedule?.weekdays, day];
    
    handleScheduleUpdate({ weekdays: newWeekdays });
  };

  const getFrequencyDescription = () => {
    switch (schedule?.frequency) {
      case 'realtime':
        return 'Articles will be posted immediately as they are discovered and processed.';
      case 'hourly':
        return 'Articles will be collected and posted in batches every hour.';
      case 'daily':
        return 'A daily digest with all relevant articles will be posted once per day.';
      case 'custom':
        return `Articles will be posted every ${schedule?.customInterval} minutes.`;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Icon name="Clock" size={48} className="mx-auto text-primary mb-4" />
        <h3 className="font-heading font-semibold text-foreground mb-2">
          Posting Schedule
        </h3>
        <p className="text-muted-foreground">
          Configure when and how often news should be posted
        </p>
      </div>
      {/* Frequency Selection */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Posting Frequency</h4>
        
        <div className="grid gap-3 mb-4">
          {frequencyOptions?.map((option) => (
            <div
              key={option?.value}
              className={`
                border rounded-lg p-3 cursor-pointer transition-smooth
                ${schedule?.frequency === option?.value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }
              `}
              onClick={() => handleScheduleUpdate({ frequency: option?.value })}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-4 h-4 rounded-full border-2 flex items-center justify-center
                  ${schedule?.frequency === option?.value
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                  }
                `}>
                  {schedule?.frequency === option?.value && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">{option?.label}</h5>
                  <p className="text-sm text-muted-foreground">{option?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Interval */}
        {schedule?.frequency === 'custom' && (
          <div className="bg-muted rounded-lg p-3">
            <Input
              label="Custom Interval (minutes)"
              type="number"
              min="5"
              max="1440"
              value={schedule?.customInterval}
              onChange={(e) => handleScheduleUpdate({ customInterval: parseInt(e?.target?.value) })}
              description="Minimum 5 minutes, maximum 24 hours (1440 minutes)"
            />
          </div>
        )}

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <Icon name="Info" size={14} className="inline mr-1" />
            {getFrequencyDescription()}
          </p>
        </div>
      </div>
      {/* Timezone */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Timezone Settings</h4>
        
        <Select
          label="Timezone"
          options={timezoneOptions}
          value={schedule?.timezone}
          onChange={(value) => handleScheduleUpdate({ timezone: value })}
          description="All posting times will be based on this timezone"
        />
      </div>
      {/* Quiet Hours */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">Quiet Hours</h4>
          <button
            onClick={() => handleScheduleUpdate({ 
              quietHours: { ...schedule?.quietHours, enabled: !schedule?.quietHours?.enabled }
            })}
            className={`
              relative w-12 h-6 rounded-full transition-smooth
              ${schedule?.quietHours?.enabled ? 'bg-primary' : 'bg-muted'}
            `}
          >
            <div className={`
              absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-smooth
              ${schedule?.quietHours?.enabled ? 'left-6' : 'left-0.5'}
            `} />
          </button>
        </div>

        {schedule?.quietHours?.enabled && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              No posts will be sent during these hours to avoid disturbing subscribers
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Time"
                type="time"
                value={schedule?.quietHours?.start}
                onChange={(e) => handleScheduleUpdate({
                  quietHours: { ...schedule?.quietHours, start: e?.target?.value }
                })}
              />
              <Input
                label="End Time"
                type="time"
                value={schedule?.quietHours?.end}
                onChange={(e) => handleScheduleUpdate({
                  quietHours: { ...schedule?.quietHours, end: e?.target?.value }
                })}
              />
            </div>
          </div>
        )}
      </div>
      {/* Active Days */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Active Days</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Select which days of the week to post news
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {weekdayOptions?.map((day) => (
            <button
              key={day?.value}
              onClick={() => handleWeekdayToggle(day?.value)}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-smooth
                ${schedule?.weekdays?.includes(day?.value)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }
              `}
            >
              {day?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Daily Limits */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Daily Limits</h4>
        
        <Input
          label="Maximum Posts Per Day"
          type="number"
          min="1"
          max="50"
          value={schedule?.maxPostsPerDay}
          onChange={(e) => handleScheduleUpdate({ maxPostsPerDay: parseInt(e?.target?.value) })}
          description="Prevent spam by limiting the number of posts per day"
        />
      </div>
      {/* Schedule Preview */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <h4 className="font-medium text-primary mb-3">Schedule Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Frequency:</span>
            <span className="text-foreground font-medium">
              {frequencyOptions?.find(f => f?.value === schedule?.frequency)?.label}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Timezone:</span>
            <span className="text-foreground font-medium">{schedule?.timezone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Active Days:</span>
            <span className="text-foreground font-medium">{schedule?.weekdays?.length}/7 days</span>
          </div>
          {schedule?.quietHours?.enabled && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quiet Hours:</span>
              <span className="text-foreground font-medium">
                {schedule?.quietHours?.start} - {schedule?.quietHours?.end}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Daily Limit:</span>
            <span className="text-foreground font-medium">{schedule?.maxPostsPerDay} posts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostingSchedule;