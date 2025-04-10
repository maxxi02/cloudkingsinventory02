import { UAParser } from 'ua-parser-js';
import { format, formatDistanceToNowStrict, isPast } from 'date-fns';
import { Laptop, LucideIcon, Smartphone } from 'lucide-react';

interface AgentType {
  deviceType: string;
  browser: string;
  os: string;
  timeAgo: string;
  icon: LucideIcon;
  deviceModel: string; // New field for device model
  osVersion: string; // New field for clean OS version
}

export const parseUserAgent = (
  userAgent: string,
  createdAt: string,
): AgentType => {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  // Get detailed device information
  const deviceType = result.device.type || 'desktop';
  const deviceModel = result.device.model || 'Unknown Device';
  const osName = result.os.name || 'Unknown OS';
  const osVersion = result.os.version || 'Unknown Version';

  // Get browser name with version
  const browser = result.browser.name
    ? `${result.browser.name} ${result.browser.version?.split('.')[0] || ''}`.trim()
    : 'Unknown Browser';

  // Format OS information

  // Determine appropriate icon
  const icon = deviceType === 'mobile' ? Smartphone : Laptop;

  // Format timestamp
  const formattedAt = isPast(new Date(createdAt))
    ? `${formatDistanceToNowStrict(new Date(createdAt))} ago`
    : format(new Date(createdAt), 'd MMM, yyyy');

  return {
    deviceType: `${deviceModel} (${deviceType})`, // Combine model and type
    browser,
    os: `${osName} ${osVersion}`,
    timeAgo: formattedAt,
    icon,
    deviceModel, // Added device model
    osVersion, // Added OS version
  };
};
