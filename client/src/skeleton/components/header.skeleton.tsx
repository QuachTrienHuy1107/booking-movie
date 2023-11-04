import {Skeleton} from "antd";
import '../../styles/components/_header.scss';

export default function HeaderSkeleton() {
  return (
    <div className="header__right">
      <Skeleton size={40} title={false} active avatar />
      <div className="header__right__location">
        <Skeleton />
      </div>
    </div>
  );
}
