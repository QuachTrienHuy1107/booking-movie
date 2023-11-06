import { Skeleton as AntdSkeleton } from "antd";
import { SkeletonProps } from "antd/lib";

interface ISkeletonProps extends SkeletonProps {
  width?: number;
  height?: number;
}

export default function Skeleton(props: ISkeletonProps) {
  return (
    <AntdSkeleton.Button {...props} active style={{ width: props.width, height: props.height }} />
  );
}
