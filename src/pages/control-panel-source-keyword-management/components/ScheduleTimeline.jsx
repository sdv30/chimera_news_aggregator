import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScheduleTimeline = ({ 
  schedule = {}, 
  onScheduleChange,
  timezone = 'UTC'
}) => {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [isEditing, setIsEditing] = useState(false);

  const days = [
    { key: 'monday', label: 'Mon', full: 'Monday' },
    { key: 'tuesday', label: 'Tue', full: 'Tuesday' },
    { key: 'wednesday', label: 'Wed', full: 'Wednesday' },
    { key: 'thursday', label: 'Thu', full: 'Thursday' },
    { key: 'friday', label: 'Fri', full: 'Friday' },
    { key: 'saturday', label: 'Sat', full: 'Saturday' },
    { key: 'sunday', label: 'Sun', full: 'Sunday' }
  ];

  const timeSlots = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  const frequencies = [
    { value: 'hourly', label: 'Every Hour', icon: 'Clock' },
    { value: 'daily', label: 'Daily', icon: 'Calendar' },
    { value: 'custom', label: 'Custom', icon: 'Settings' }
  ];

  const handleFrequencyChange = (frequency) => {
    onScheduleChange({
      ...schedule,
      frequency,
      ...(frequency === 'hourly' && { times: ['09:00', '12:00', '15:00', '18:00'] }),
      ...(frequency === 'daily' && { times: ['09:00'] })
    });
  };

  const handleTimeToggle = (time) => {
    const currentTimes = schedule?.times || [];
    const newTimes = currentTimes?.includes(time)
      ? currentTimes?.filter(t => t !== time)
      : [...currentTimes, time]?.sort();
    
    onScheduleChange({
      ...schedule,
      times: newTimes
    });
  };

  const handleDayToggle = (day) => {
    const currentDays = schedule?.days || [];
    const newDays = currentDays?.includes(day)
      ? currentDays?.filter(d => d !== day)
      : [...currentDays, day];
    
    onScheduleChange({
      ...schedule,
      days: newDays
    });
  };

  const isTimeActive = (time) => {
    return schedule?.times?.includes(time) || false;
  };

  const isDayActive = (day) => {
    return schedule?.days?.includes(day) || false;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading font-semibold text-foreground mb-1">
            Monitoring Schedule
          </h3>
          <p className="text-sm text-muted-foreground">
            Configure when to check for new articles
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Globe" size={16} />
          <span>{timezone}</span>
        </div>
      </div>
      {/* Frequency Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Monitoring Frequency
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {frequencies?.map((freq) => (
            <button
              key={freq?.value}
              onClick={() => handleFrequencyChange(freq?.value)}
              className={`
                flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200
                ${schedule?.frequency === freq?.value
                  ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground'
                }
              `}
            >
              <Icon name={freq?.icon} size={20} />
              <div className="text-left">
                <div className="font-medium">{freq?.label}</div>
                <div className="text-xs opacity-70">
                  {freq?.value === 'hourly' && 'Check every hour'}
                  {freq?.value === 'daily' && 'Check once per day'}
                  {freq?.value === 'custom' && 'Set specific times'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Days Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Active Days
        </label>
        <div className="flex flex-wrap gap-2">
          {days?.map((day) => (
            <button
              key={day?.key}
              onClick={() => handleDayToggle(day?.key)}
              className={`
                px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium
                ${isDayActive(day?.key)
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary/50 text-foreground'
                }
              `}
            >
              {day?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Time Selection */}
      {schedule?.frequency === 'custom' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            Monitoring Times
          </label>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
            {timeSlots?.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeToggle(time)}
                className={`
                  px-2 py-1.5 rounded text-xs font-medium transition-all duration-200
                  ${isTimeActive(time)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Timeline Visualization */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Schedule Preview
        </label>
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-foreground">
                Next check: {schedule?.times?.[0] || '09:00'} today
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {schedule?.days?.length || 7} days active
              </span>
            </div>
          </div>
          
          {/* Visual Timeline */}
          <div className="mt-4 flex items-center space-x-1">
            {timeSlots?.slice(6, 22)?.map((time) => (
              <div
                key={time}
                className={`
                  w-3 h-8 rounded-sm transition-all duration-200
                  ${isTimeActive(time) ? 'bg-primary' : 'bg-border'}
                `}
                title={`${time} - ${isTimeActive(time) ? 'Active' : 'Inactive'}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>06:00</span>
            <span>22:00</span>
          </div>
        </div>
      </div>
      {/* Quick Presets */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onScheduleChange({
            frequency: 'custom',
            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            times: ['09:00', '13:00', 'Ж17:00']
          })}
        >
          Business Hours
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onScheduleChange({
            frequency: 'hourly',
            days: days?.map(d => d?.key),
            times: ['08:00', '12:00', '16:00', '20:00']
          })}
        >
          24/7 Monitoring
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onScheduleChange({
            frequency: 'daily',
            days: days?.map(d => d?.key),
            times: ['09:00']
          })}
        >
          Daily Summary
        </Button>
      </div>
    </div>
  );
};

export default ScheduleTimeline;