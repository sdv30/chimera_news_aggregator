import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChannelSelector = ({ botInfo = null, onChannelSelect = () => {}, selectedChannels = [] }) => {
  const [channels, setChannels] = useState([]);
  const [newChannelId, setNewChannelId] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState({});

  // Mock channels data
  const mockChannels = [
    {
      id: '@chimera_news',
      name: 'Chimera News Channel',
      type: 'channel',
      memberCount: 1250,
      isConnected: true,
      permissions: ['post_messages', 'edit_messages', 'delete_messages'],
      lastPost: new Date(Date.now() - 3600000)
    },
    {
      id: '@tech_updates',
      name: 'Tech Updates',
      type: 'channel',
      memberCount: 850,
      isConnected: false,
      permissions: [],
      lastPost: null
    },
    {
      id: '-1001234567890',
      name: 'News Discussion Group',
      type: 'group',
      memberCount: 45,
      isConnected: true,
      permissions: ['post_messages'],
      lastPost: new Date(Date.now() - 7200000)
    }
  ];

  useEffect(() => {
    if (botInfo) {
      setChannels(mockChannels);
    }
  }, [botInfo]);

  const handleConnectChannel = async (channelId) => {
    setIsConnecting(true);
    setConnectionStatus(prev => ({ ...prev, [channelId]: 'connecting' }));

    // Simulate connection process
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      
      if (success) {
        setChannels(prev => prev?.map(channel => 
          channel?.id === channelId 
            ? { 
                ...channel, 
                isConnected: true, 
                permissions: ['post_messages', 'edit_messages'] 
              }
            : channel
        ));
        setConnectionStatus(prev => ({ ...prev, [channelId]: 'success' }));
      } else {
        setConnectionStatus(prev => ({ ...prev, [channelId]: 'error' }));
      }
      
      setIsConnecting(false);
      
      // Clear status after 3 seconds
      setTimeout(() => {
        setConnectionStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus?.[channelId];
          return newStatus;
        });
      }, 3000);
    }, 2000);
  };

  const handleAddChannel = () => {
    if (!newChannelId?.trim()) return;

    const newChannel = {
      id: newChannelId,
      name: newChannelId?.startsWith('@') ? newChannelId?.slice(1) : `Channel ${newChannelId}`,
      type: newChannelId?.startsWith('@') ? 'channel' : 'group',
      memberCount: 0,
      isConnected: false,
      permissions: [],
      lastPost: null
    };

    setChannels(prev => [...prev, newChannel]);
    setNewChannelId('');
  };

  const handleChannelToggle = (channelId) => {
    const isSelected = selectedChannels?.includes(channelId);
    const newSelection = isSelected
      ? selectedChannels?.filter(id => id !== channelId)
      : [...selectedChannels, channelId];
    
    onChannelSelect(newSelection);
  };

  const getStatusIcon = (channel) => {
    const status = connectionStatus?.[channel?.id];
    
    if (status === 'connecting') return 'Loader';
    if (status === 'success') return 'CheckCircle';
    if (status === 'error') return 'XCircle';
    if (channel?.isConnected) return 'CheckCircle';
    return 'AlertCircle';
  };

  const getStatusColor = (channel) => {
    const status = connectionStatus?.[channel?.id];
    
    if (status === 'connecting') return 'text-warning';
    if (status === 'success') return 'text-success';
    if (status === 'error') return 'text-error';
    if (channel?.isConnected) return 'text-success';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Icon name="Users" size={48} className="mx-auto text-primary mb-4" />
        <h3 className="font-heading font-semibold text-foreground mb-2">
          Select Channels
        </h3>
        <p className="text-muted-foreground">
          Choose which channels will receive automated news posts
        </p>
      </div>
      {/* Add New Channel */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Add New Channel</h4>
        <div className="flex space-x-2">
          <Input
            placeholder="@channel_name or -1001234567890"
            value={newChannelId}
            onChange={(e) => setNewChannelId(e?.target?.value)}
            className="flex-1"
          />
          <Button
            onClick={handleAddChannel}
            disabled={!newChannelId?.trim()}
            iconName="Plus"
          >
            Add
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Enter channel username (@channel) or group ID (-1001234567890)
        </p>
      </div>
      {/* Channels List */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Available Channels</h4>
        
        {channels?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No channels found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add your bot to channels and they will appear here
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {channels?.map((channel) => (
              <div
                key={channel?.id}
                className={`
                  bg-card border rounded-lg p-4 transition-smooth cursor-pointer
                  ${selectedChannels?.includes(channel?.id)
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }
                `}
                onClick={() => channel?.isConnected && handleChannelToggle(channel?.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Selection Checkbox */}
                    <div className={`
                      w-4 h-4 rounded border-2 flex items-center justify-center
                      ${selectedChannels?.includes(channel?.id)
                        ? 'bg-primary border-primary' :'border-muted-foreground'
                      }
                      ${!channel?.isConnected ? 'opacity-50' : ''}
                    `}>
                      {selectedChannels?.includes(channel?.id) && (
                        <Icon name="Check" size={12} color="white" />
                      )}
                    </div>

                    {/* Channel Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={channel?.type === 'channel' ? 'Hash' : 'Users'} 
                          size={16} 
                          className="text-muted-foreground" 
                        />
                        <h5 className="font-medium text-foreground">{channel?.name}</h5>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                          {channel?.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                        <span>{channel?.memberCount} members</span>
                        <span>{channel?.id}</span>
                        {channel?.lastPost && (
                          <span>Last post: {channel?.lastPost?.toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getStatusIcon(channel)} 
                      size={16} 
                      className={`${getStatusColor(channel)} ${
                        connectionStatus?.[channel?.id] === 'connecting' ? 'animate-spin' : ''
                      }`}
                    />
                    
                    {!channel?.isConnected && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation();
                          handleConnectChannel(channel?.id);
                        }}
                        disabled={isConnecting}
                        loading={connectionStatus?.[channel?.id] === 'connecting'}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </div>

                {/* Permissions */}
                {channel?.isConnected && channel?.permissions?.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex flex-wrap gap-1">
                      {channel?.permissions?.map((permission) => (
                        <span
                          key={permission}
                          className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full"
                        >
                          {permission?.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Instructions */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-2">Setup Instructions</h4>
        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
          <li>Add your bot to the desired channel as an administrator</li>
          <li>Grant necessary permissions (post messages, edit messages)</li>
          <li>Click "Connect" to verify the connection</li>
          <li>Select channels where you want to post news</li>
        </ol>
      </div>
      {/* Selection Summary */}
      {selectedChannels?.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-primary" />
            <p className="text-sm font-medium text-primary">
              {selectedChannels?.length} channel{selectedChannels?.length !== 1 ? 's' : ''} selected
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            News will be automatically posted to these channels
          </p>
        </div>
      )}
    </div>
  );
};

export default ChannelSelector;