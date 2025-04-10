import React from 'react';
import { Loader, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { parseUserAgent } from '@/lib/parse-useragent';

const SessionItem = (props: {
  loading?: boolean;
  userAgent: string;
  date: string;
  expiresAt: string;
  isCurrent?: boolean;
  onRemove?: () => void;
}) => {
  const { userAgent, loading, date, isCurrent = false, onRemove } = props;
  const {
    os,
    browser,
    timeAgo,
    icon: Icon,
    deviceType,
  } = parseUserAgent(userAgent, date);
  return (
    <div className="w-full flex items-center ">
      <div
        className="shrink-0 mr-[16px] flex items-center justify-center
       w-[48px] h-[48px] rounded-full border border-[#eee] dark:border-[rgb(42,45,48)]"
      >
        <Icon />
      </div>
      <div className="flex-1 flex items-center">
        <div className="flex-1 flex flex-col items-stat gap-2">
          <h5 className="text-sm font-medium leading-1">
            Device: {deviceType} {os} | {browser}
          </h5>
          <div className="flex items-center ">
            {isCurrent ? (
              <div
                className="bg-green-500/80 h-[20px] px-2 w-[81px] 
              flex items-center justify-center text-xs text-white rounded-lg"
              >
                Active now
              </div>
            ) : (
              <span className="mr-[16px] text-[12px] text-[whitesmoke] font-normal">
                {timeAgo}
              </span>
            )}
          </div>
        </div>

        {!isCurrent && (
          <Button
            variant="ghost"
            size="icon"
            disabled={loading}
            onClick={onRemove}
          >
            {loading ? (
              <Loader className="animate-spin w-4 h-4" />
            ) : (
              <Trash2 size="29px" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SessionItem;
