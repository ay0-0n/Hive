import useAllCommentReports from "../../../hooks/useAllCommentReports";
import useAllPostReports from "../../../hooks/useAllPostReports";

const Reports = () => {
    const PostReports = useAllPostReports();
    const CommentReports = useAllCommentReports();

    return (
        <div>
            Reports
        </div>
    );
};

export default Reports;